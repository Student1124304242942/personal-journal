import { useLocalStorage } from './components/hooks/use-localStorage.hook';
import { useState } from 'react';
import Body from './layouts/body/Body';
import Leftpanel from './layouts/leftPanel/LeftPanel';
import JournalList from './components/journalList/JournalList';
import Header from './components/header/Header';
import JournalOffer from './components/journalOffer/JournalOffer';
import AddJournalButton from './components/addJournalButton/AddJournalButton';
import styles from './App.module.css';
import cl from 'classnames';
function mapItems(some){
  if(!some){
    return [];
  }
  return some.map(i => ({
    ...i,
    date: new Date(i.date)
  }))
}

const App = () => {
  const [mobileBar, setMobileBar] = useState(false);
  const [items, setItems] = useLocalStorage('personal_journal_user');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMobileBar = () => {
    setMobileBar(!mobileBar);
  }

  const addItem = item => {
    if(!item.id){
     const newItems = [... mapItems(items), {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1:1
      }];
      setItems(newItems);
    } else {
      setItems([...mapItems(items).map(i => {
        if(i.id === item.id){
          return {...item};
        }; 
        return i;
      })]);
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter(i => i.id !== id)]);
  };

  return ( 
    <div className='relative min-w-full min-h-[100vh] flex flex-col  items-center'>
      <div className={cl(styles.main, 'pt-[10px] min-w-full')}>
        <div className={cl('md:hidden block absolute w-[100%] min-h-[100vh] bg-[#181818] z-10', {
          ['-left-[100%]']:!mobileBar,
          ['left-0']: mobileBar
        })}>
          <div className='relative'>
            <div className='cursor-pointer absolute  top-[10px] right-[10px] hover:bg-[#f1f1f1f1] rounded-[50%]' onClick={handleMobileBar}>
              <img src="personal-journal/close.svg" alt="" />  
            </div>
            <Leftpanel>
                <Header/>
                <JournalList  mobileItem={handleMobileBar} items={mapItems(items)} setItem={setSelectedItem}/>
            </Leftpanel>
          </div>
        </div>
        <div className={cl(styles.sidebar, 'md:block hidden')}>
          <Leftpanel>
              <Header/>
              <AddJournalButton onClick = {() => setSelectedItem(null)}/>
              <JournalList  items={mapItems(items)} setItem={setSelectedItem}/>
          </Leftpanel>
        </div>
        <div className={cl(styles.body)}>
          <Body>
            <div className='md:hidden block px-[30px]'>
              <AddJournalButton onClick = {() => setSelectedItem(null)}/>
            </div>
            <JournalOffer onSubmit = {addItem} data={selectedItem} onDeleteItem={deleteItem}/>
          </Body>
        </div>
      </div>
      <button onClick={handleMobileBar} className=' absolute bottom-[10px]  flex py-[5px] w-[130px] rounded-[5px] items-center justify-between md:hidden text-white text-[18px] bg-blue-500 hover:bg-blue-700'>
          <img src="personal-journal/menu.svg" alt="" className='ml-[5px]'/>
          <div className='mr-[5px] uppercase'>
            memories
          </div>
        </button>
    </div>
  )
}

export default App;

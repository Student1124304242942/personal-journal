import JournalItem from '../journalItem/JournalItem';
import CardButton from '../cardButton/CardButton';

const JournalList = ({ items, setItem, mobileItem }) => {

  const sortMap = (a, b) => {
    return (a.date < b.date) ? 1 : -1;
  }

   
  const sortedItems = [...items].sort(sortMap); 

  if (sortedItems.length === 0) {
    return <p>Записей нет, добавьте одну</p>
  }

  return (
    <div className='mt-[30px] md:z-0 z-50 flex flex-col gap-[20px] relative'>
      {sortedItems.map(el => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem
            onClick = {mobileItem}
            text={el.text}
            title={el.title}
            date={el.date}
          />
        </CardButton>
      ))}
    </div>
  )
}

export default JournalList;

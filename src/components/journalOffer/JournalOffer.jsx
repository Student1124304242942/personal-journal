import  {  useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import classNames from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import { useRef } from 'react';

const JournalOffer = ({onSubmit, data, onDeleteItem}) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const {isValid,  isFormReadyToSubmit, values} = formState;
  const titleRef = useRef();
  const textRef = useRef();
  const dateRef = useRef();

  const focusError = () => {
    switch(true){
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;       
    }
  }

  useEffect(() => {
    if(!data){
      dispatchForm({type: "CLEAR"});
      dispatchForm({type: 'SET_VALUE'});
    }
    dispatchForm({type: 'SET_VALUE', payload:{...data}});
  }, [data])


  useEffect(() => {
    let time;
    if(!isValid.date || !isValid.post || !isValid.title){
      focusError(isValid)
      time = setTimeout(() => {
        dispatchForm({type: 'RESET_VALIDITY'});
      }, 2000)
    }
    return () => {
      clearTimeout(time);
    };
  }, [isValid]);

  useEffect(() => {
    if(isFormReadyToSubmit){
      onSubmit(values);
      dispatchForm({type: "CLEAR"});
      dispatchForm({type: 'SET_VALUE', });
    }
  }, [isFormReadyToSubmit, values, onSubmit])

  useEffect(() => {
    dispatchForm({type: 'SET_VALUE'})
  }, [])

  const onChange = (e) => {
    dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}})
  }

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({type: "SUBMIT"});
  };

  return (
      <form className='flex flex-col gap-[10px] p-[30px] w-[100%] relative text-white' onSubmit={addJournalItem}>
        <div className='w-[100%] flex'>
        <input type='title' name='title' ref={titleRef} value={values.title} className= {classNames(classNames, {
        ['bg-[#181818] border-white border-solid border-2 w-[100%] py-[10px]']: isValid.title,
        [' bg-[red] transition-[0.5s] border-2 border-black border-solid w-[100%]']: !isValid.title
      })} onChange={onChange}/>
          {data?.id &&  <button onClick ={() => onDeleteItem(data.id)}><img src='personal-journal/input.svg' className='rounded-[100px] border-[1px] border-[#FFFFFF] border-solid gap-[8px] opacity-[40%] w-[30px] h-[30px]'/></button>}
        </div>
        <div className='w-[100%] flex flex-col gap-[5px] text-black'>
          <input type="date" name='date' ref={dateRef} className={classNames({
            ['bg-[red] transition-[0.5s]']: !isValid.date,
            ['bg-white transition-[0.5s]']: isValid.date
          })} onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0,10) : " "}/>
          <input type="text" name='tag' onChange={onChange} value={values.tag} />
        </div>
           <textarea ref={textRef} name="text" type='text' onChange={onChange} value={values.text} className={classNames('textarea', {
             ['space-between align-center h-[300px] w-[100%] flex bg-[#181818] border-2 border-white border-solid']: isValid.text,
             ['space-between align-center h-[300px] flex w-[100%] bg-[red] transition-[0.5s] border-2 border-black border-solid']: !isValid.text,
           })}></textarea>
        <Button>новое вспоминание</Button>
      </form>
      ) 
}

export default JournalOffer;


 
const AddJournalButton = ({...props}) => {
  return (
    <button className='bg-[#FFFFFF08] rounded-[3px] p-[10px] h-[40px] relative w-[100%] justify-center flex g-[10px] mt-[30px]' {...props}>
        <div className='flex gap-[10px]'>
          <img src='personal-journal/plus.svg' className=''/>
          <span className='font-[600] text-[16px]/[20.11px] text-[#fff] '>Новое вспоминание</span>
        </div>
    </button>
  )
}

export default AddJournalButton
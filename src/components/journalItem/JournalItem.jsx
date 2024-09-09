const JournalItem = ({title, text, date, ...props}) => {
  const formateDate = new Intl.DateTimeFormat('ru-RU').format(date);  
  return (
    <div className = 'bg-[#FFFFFF08] p-[20px] flex flex-col gap-[10px] relative' {...props}>
        <h1 className='text-[#fff] text-[18px]/[28px] font-[600] flex'>{title}</h1>
        <div className='flex gap-[10px]'>
            <p className='text-[#FFFFFF66] text-[16px]/[20.11px]'>{formateDate}</p>
            <p className='text-[#FFFFFF66] text-[16px]/[20.11px]'>{text}</p>
        </div>
    </div>
  )
}

export default JournalItem
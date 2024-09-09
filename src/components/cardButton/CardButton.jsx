const CardButton = ({children, ...props}) => {
  return <button className='relative' {...props}>{children}</button>
  
}

export default CardButton
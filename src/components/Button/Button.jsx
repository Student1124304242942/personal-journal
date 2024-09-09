const Button = ({children, ...props}) => {
  return (
    <button className=" bg-blue-500 text-[18px] py-[10px] hover:bg-blue-700" {...props}>{children}</button>
  )
}

export default Button

export default ({ id='', className='', part, title, children }) => {
  return (
    <div id={id} className={`flex flex-col gap-5 mb-5 ${className}`}>
      <h2 className='font-bold text-xl'>
        Part {part}: {title}
      </h2>
      {children}
    </div>
  )
}
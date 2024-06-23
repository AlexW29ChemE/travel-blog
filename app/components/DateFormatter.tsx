type Props = {
    date: Date|string|number|undefined|null;
  };
  
  export default  function DateFormatter({ date }: Props)  {
    const dateObj = date?new Date(date):new Date();
    return <time dateTime={dateObj.toISOString()}>{dateObj.toLocaleDateString()}</time>;
  };
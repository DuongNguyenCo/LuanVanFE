function Button(prop) {
  return <button className={"rounded  " + prop.className}>{prop.text}</button>;
}

export default Button;

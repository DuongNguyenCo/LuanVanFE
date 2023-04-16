function Input(prop) {
  const { setValue, initValue, value } = prop;

  return (
    <div className={prop.className || " h-20 w-full"}>
      <label
        className={prop.label === undefined ? undefined : "mb-2 inline-block"}
        htmlFor={prop.id}
      >
        {prop.label || undefined}{" "}
        {prop.request && <sup className="text-button">*</sup>}
      </label>
      <input
        id={prop.id}
        className={
          prop.type === "file"
            ? "w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-violet-100"
            : "placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        }
        type={prop.type || "text"}
        placeholder={prop.placeholder}
        name={prop.name}
        accept={prop.type === "file" ? prop.accept : undefined}
        onChange={(e) => {
          setValue({
            ...initValue,
            [e.target.name]: e.target.value,
          });
        }}
        value={value !== undefined ? value : undefined}
        autoComplete="off"
      />
    </div>
  );
}

export default Input;

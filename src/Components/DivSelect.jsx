import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(
  (
    {
      icon = 'user',
      name,
      id,
      value,
      className,
      required,
      isFocused,
      load,
      handleChange,
      options, // Nueva prop para las opciones del select
    },
    ref
  ) => {
    const selectRef = ref ? ref : useRef();
    useEffect(() => {
      if (isFocused) {
        selectRef.current.focus();
      }
    }, []);

    return (
      <div className='input-group mb-3'>
        <span className='input-group-text'>
          <i className={`fa-solid ${icon}`}></i>
        </span>
        <select
          name={name}
          id={id}
          value={value}
          className={className}
          ref={selectRef}
          required={required}
          onClick={ (e) => load(e) }
          onChange={ (e) => handleChange(e) }
        >
          
          <option>seleccione una opcion</option>
          {
          options &&
            options.map((option,i) => (
              <option key={option+i} value={option.value} >
                {/* {option.label} */}
                {option}
              </option>
            ))}
        </select>
      </div>
    );
  }
);


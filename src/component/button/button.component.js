import './button.styles.scss'

const BUTTON_TYPE_CLASS={

    google:'google-sign-in',
    inverted:'inveted'
}

const Button=({children,buttontype,...otherProps})=>{
    return(

        <button className={`button-container ${BUTTON_TYPE_CLASS[buttontype]}`}
        {...otherProps}>
          {children}           
        </button>

    )
}

export default Button;
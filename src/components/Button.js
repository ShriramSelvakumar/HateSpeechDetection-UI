import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {

    const buttonStyle = {
        backgroundColor: color
    }

    return (
    <button onClick={onClick} className='btn' style={buttonStyle}>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

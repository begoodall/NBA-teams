import PropTypes from 'prop-types';

export default function Caret({ alphabeticalSort }) {
  let caret = alphabeticalSort ? '▼' : '▲';
  return (
    <span style={{fontSize: '14px', marginLeft: '10px'}}>
      {caret}
    </span>
  )
}

Caret.propTypes = {
  alphabeticalSort: PropTypes.bool.isRequired,
}

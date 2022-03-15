export default function Caret({ alphabeticalSort }) {
  let caret = alphabeticalSort ? '▼' : '▲';
  return (
    <span style={{fontSize: '14px', marginLeft: '10px'}}>
      {caret}
    </span>
  )
}
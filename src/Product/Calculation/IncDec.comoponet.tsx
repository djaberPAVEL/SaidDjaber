interface Props {
  onDes: () => void;
  onInc: () => void;
  number: number;
}

function IncDec({ onDes, onInc, number }: Props) {
  return (
    <>
      <button className="btn btn-danger" onClick={onDes}>
        -
      </button>
      <span>{number}</span>
      <button className="btn btn-secondary" onClick={onInc}>
        +
      </button>
    </>
  );
}
export default IncDec;

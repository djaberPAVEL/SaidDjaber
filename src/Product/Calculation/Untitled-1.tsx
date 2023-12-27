// A new component to wrap IncDec
const IncDecWrapper = ({ product, action }) => (
  <IncDec
    onInc={() => action(product)}
    number={product.quantity}
  />
);

// Inside your component's return statement
<table className="table table-bordered border-primary">
  <thead>
    <tr>
      <th scope="col">Product name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Result</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.name}>
        <th scope="row">{product.name}</th>
        <td>
          <IncDecWrapper product={product} action={onIncQuantity} />
        </td>
        <td>
          <IncDecWrapper product={product} action={onIncPrice} />
        </td>
        {/* ... */}
      </tr>
    ))}
  </tbody>
</table>
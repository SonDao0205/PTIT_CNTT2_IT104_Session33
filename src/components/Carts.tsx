import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

type Shopping = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  img: string;
  price: number;
};

export default function Carts() {
  const carts = useSelector((state: any) => state.carts);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const total = carts.reduce(
    (acc: number, curr: Shopping) => acc + curr.price * curr.quantity,
    0
  );
  useEffect(() => {
    dispatch({ type: "display" });
  }, []);

  const handleChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-50">
      <h1
        className="p-1"
        style={{ backgroundColor: "#F2DEDE", color: "#BB8FA4" }}
      >
        Your Cart
      </h1>
      <div className="inCarts">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((element: Shopping, index: number) => {
              return (
                <tr key={element.id}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.price} USD</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="border border-black p-2"
                      value={
                        quantities[element.id] !== undefined
                          ? quantities[element.id]
                          : element.quantity
                      }
                      onChange={(e) =>
                        handleChange(element.id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="me-1"
                      style={{
                        backgroundColor: "#5BC0DE",
                        color: "white",
                        border: "transparent",
                        padding: "2px",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "handleUpdate",
                          payload: {
                            id: element.id,
                            quantity:
                              quantities[element.id] ?? element.quantity,
                          },
                        })
                      }
                    >
                      Update
                    </button>
                    <button
                      style={{
                        backgroundColor: "#DA5350",
                        color: "white",
                        border: "transparent",
                        padding: "2px",
                      }}
                      onClick={() =>
                        dispatch({ type: "handleDelete", payload: element.id })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {carts.length === 0 && <p>Empty product in your cart</p>}
        <footer className="d-flex justify-content-between">
          <div className="notification">
            There are {carts.length} items in your shopping cart
          </div>
          <div className="totalPrice text-danger fs-5">{total} USD</div>
        </footer>
      </div>
    </div>
  );
}

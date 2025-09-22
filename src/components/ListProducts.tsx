import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carts from "./Carts";

type Shopping = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  img: string;
  price: number;
};

export default function ListProducts() {
  const shoppingList = useSelector((state: any) => state.shoppingList);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialInputs: { [key: number]: number } = {};
    shoppingList.forEach((item: Shopping) => {
      initialInputs[item.id] = 1;
    });
    setInputs(initialInputs);
  }, [shoppingList]);

  const handleChange = (id: number, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="container-fluid d-flex gap-5">
      <div style={{ width: "50%" }} className="listProducts">
        <h1
          className="p-1"
          style={{ backgroundColor: "#347AB7", color: "white" }}
        >
          List Products
        </h1>
        <div className="products d-flex flex-column gap-4">
          {shoppingList.map((element: Shopping) => {
            console.log("Product Id : ", element.id);
            return (
              <div key={element.id} className="item d-flex gap-3">
                <img
                  style={{ width: "150px" }}
                  src={element.img}
                  alt={element.name}
                />
                <div className="information">
                  <h3>{element.name}</h3>
                  <p>{element.description}</p>
                </div>
                <div
                  style={{ width: "120px" }}
                  className="buy d-flex flex-column justify-content-between"
                >
                  <input
                    type="number"
                    min={1}
                    value={inputs[element.id] || 1}
                    onChange={(event) =>
                      handleChange(element.id, Number(event.target.value))
                    }
                  />

                  <button
                    className="p-1 text-white text-center mt-2"
                    style={{
                      backgroundColor: "#FF6634",
                      border: "none",
                    }}
                    onClick={() =>
                      dispatch({
                        type: "addToCart",
                        payload: {
                          ...element,
                          quantity: inputs[element.id] || 1,
                        },
                      })
                    }
                  >
                    {element.price} USD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Carts />
    </div>
  );
}

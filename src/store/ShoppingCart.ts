type Shopping = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  img: string;
  price: number;
};

const shoppingList: Shopping[] = [
  {
    id: 1,
    name: "Pizza",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    quantity: 10,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SspP4wLPsIqTNreUMPcYeWt9vUQyFhjAqg&s",
    price: 30,
  },
  {
    id: 2,
    name: "Hamburger",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    quantity: 10,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SspP4wLPsIqTNreUMPcYeWt9vUQyFhjAqg&s",
    price: 15,
  },
  {
    id: 3,
    name: "Bread",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    quantity: 10,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SspP4wLPsIqTNreUMPcYeWt9vUQyFhjAqg&s",
    price: 20,
  },
  {
    id: 4,
    name: "Cake",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
    quantity: 10,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SspP4wLPsIqTNreUMPcYeWt9vUQyFhjAqg&s",
    price: 10,
  },
];

type ActionType = {
  type: string;
  payload?: Shopping;
};

type AppState = {
  shoppingList: Shopping[];
  carts: Shopping[];
};

const initialState: AppState = {
  shoppingList,
  carts: [],
};

export const ShoppingAction = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "display": {
      const cartsLocal = JSON.parse(localStorage.getItem("carts") || "[]");
      return { ...state, carts: cartsLocal };
    }

    case "addToCart": {
      const product = action.payload as Shopping;
      const productInStock = state.shoppingList.find(
        (item) => item.id === product.id
      );

      if (!productInStock) return state;

      const existing = state.carts.find((item) => item.id === product.id);

      if (
        existing &&
        existing.quantity + product.quantity > productInStock.quantity
      ) {
        alert("Số lượng vượt quá tồn kho!");
        return state;
      }
      if (product.quantity > productInStock.quantity) {
        alert("Số lượng vượt quá tồn kho!");
        return state;
      }

      let updatedCarts;
      if (existing) {
        updatedCarts = state.carts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updatedCarts = [...state.carts, { ...product }];
      }

      localStorage.setItem("carts", JSON.stringify(updatedCarts));

      return { ...state, carts: updatedCarts };
    }

    case "handleDelete": {
      const id = Number(action.payload);
      const updatedCarts = state.carts.filter((item) => item.id !== id);
      if (confirm("Bạn có muốn xoá sản phẩm này?")) {
        localStorage.setItem("carts", JSON.stringify(updatedCarts));
        return { ...state, carts: updatedCarts };
      }
      return state;
    }

    case "handleUpdate": {
      const { id, quantity } = action.payload as {
        id: number;
        quantity: number;
      };

      const productInStock = state.shoppingList.find((item) => item.id === id);
      if (!productInStock) return state;

      if (quantity > productInStock.quantity) {
        alert("Số lượng vượt quá tồn kho!");
        return state;
      }

      const updatedCarts = state.carts.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      localStorage.setItem("carts", JSON.stringify(updatedCarts));

      return { ...state, carts: updatedCarts };
    }

    default:
      return state;
  }
};

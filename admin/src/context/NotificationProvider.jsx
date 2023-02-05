import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    type: "",
    value: "",
  });
  const notificationRef = useRef();

  const [backgroundColor, setBackgroundColor] = useState("");

  let timeoutId;
  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!type || !value) return;
    switch (type) {
      case "error":
        setBackgroundColor("bg-red-400");
        break;
      case "warning":
        setBackgroundColor("bg-orange-400");
        break;
      case "success":
        setBackgroundColor("bg-green-400");
        break;
      default:
        setBackgroundColor("bg-red-400");
    }

    setNotification({ type, value });
    timeoutId = setTimeout(() => {
      setNotification({ type: "", value: "" });
    }, 3000);
  };

  useEffect(() => {
    notificationRef.current?.classList.remove("bottom-14", "opacity-0");
    notificationRef.current?.classList.add("bottom-10", "opacity-1");

    // return () => {
    //   notificationRef.current?.classList.add("bottom-14", "opacity-0");
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   notificationRef.current?.classList.remove("bottom-10", "opacity-1");
    // };
  }, [notification.value]);

  return (
    <>
      <NotificationContext.Provider value={{ updateNotification }}>
        {children}
      </NotificationContext.Provider>
      {notification.value ? (
        <p
          ref={notificationRef}
          className={`${backgroundColor} rounded p-2 text-white fixed bottom-14 opacity-0 right-1/2 -translate-x-1/2 transition-all duration-150 ease-linear`}
        >
          {notification.value}
        </p>
      ) : null}
    </>
  );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;

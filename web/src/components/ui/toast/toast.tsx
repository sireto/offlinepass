interface ToastProps {
  className: string;
  icon: any;
  message: any;
}

const Toast = ({ className, icon, message }: ToastProps) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {message}
      {icon}
    </div>
  );
};

export default Toast;

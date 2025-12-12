// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import Proptypes from "prop-types";

const ScrollTop = ({ 
  showOffset = 300,                    // ✅ default value مستقیم در پارامتر
  scrollBehaviour = "smooth",          // ✅ default value مستقیم در پارامتر
  children, 
  ...rest 
}) => {
  // ** State
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= showOffset) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    if (window) {
      window.addEventListener("scroll", handleScroll);
      
      // ✅ Cleanup function برای جلوگیری از memory leak
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [showOffset]); // ✅ اضافه کردن dependency

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour });
  };

  return (
    visible && (
      <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
        {children}
      </div>
    )
  );
};

export default ScrollTop;

// ** PropTypes
ScrollTop.propTypes = {
  showOffset: Proptypes.number,
  children: Proptypes.any.isRequired,
  scrollBehaviour: Proptypes.oneOf(["smooth", "instant", "auto"]),
};

// ❌ این خط حذف شد - دیگه نیازی نیست
// ScrollTop.defaultProps = {
//   scrollBehaviour: "smooth",
// };
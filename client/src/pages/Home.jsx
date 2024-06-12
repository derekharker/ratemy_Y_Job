import { Link } from "react-router-dom";
import "../App.css"; // Assuming you have a CSS file for styling

const RateMyYJob = () => {
  return (
    <div>
      <Link to="/">
        <svg width="350" height="350">
          <image
            xlinkHref="/static/White Logo V4.svg"
            width="350"
            height="350"
          />
        </svg>
      </Link>
      <div id="rectangle"></div>
      <svg width="1920" height="654">
        <image
          xlinkHref="/static/Main Page Computer.svg"
          width="1920"
          height="654"
        />
      </svg>

      <Link to="/search" className="btn btn-primary">
        <span className="btn btn-box">Find a Job</span>
      </Link>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="343"
        height="78"
        viewBox="0 0 343 78"
        fill="none"
      >
        <g filter="url(#filter0_d_24_3)">
          <path
            d="M4.5841 35C4.5841 15.67 20.2541 0 39.5841 0H175.313H303.529C322.859 0 338.529 15.67 338.529 35C338.529 54.33 322.859 70 303.529 70H39.5841C20.2541 70 4.5841 54.33 4.5841 35Z"
            fill="#003CA6"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_24_3"
            x="0.584099"
            y="0"
            width="341.945"
            height="78"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_24_3"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_24_3"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default RateMyYJob;

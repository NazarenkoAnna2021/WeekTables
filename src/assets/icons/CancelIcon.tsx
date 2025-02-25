import * as React from "react"
import { FC } from "react";
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop } from "react-native-svg"

interface IProps {
  width?: number;
  height?: number;
  color?: string;
};

export const CancelIcon: FC<IProps> = ({ width, height, color }) => {
  return (
    <Svg
      width={width || 15}
      height={height || 14}
      viewBox="0 0 15 14"
      fill="none"
    >
      <G clipPath="url(#clip0_6513_6299)">
        <Path
          d="M7.5 13.738c4.142 0 7.5-3.075 7.5-6.87C15 3.076 11.642 0 7.5 0 3.358 0 0 3.075 0 6.869c0 3.794 3.358 6.869 7.5 6.869z"
          fill={color || "red"}
        />
        <Path
          d="M15 6.869c0 3.778-3.375 6.869-7.5 6.869-2.39 0-4.5-.987-5.86-2.576 1.266.945 2.907 1.503 4.688 1.503 4.125 0 7.5-3.091 7.5-6.87 0-1.63-.61-3.133-1.64-4.292C13.921 2.747 15 4.679 15 6.869z"
          fill="url(#paint0_linear_6513_6299)"
        />
        <Path
          d="M10.922 10.003a.785.785 0 01-1.031 0L7.5 7.813l-2.39 2.19a.785.785 0 01-1.032 0 .634.634 0 010-.945l2.39-2.19-2.39-2.189a.634.634 0 010-.944.785.785 0 011.031 0L7.5 5.925l2.39-2.19a.785.785 0 011.032 0 .634.634 0 010 .944l-2.39 2.19 2.39 2.19a.634.634 0 010 .944z"
          fill={"#fff"}
        />
      </G>
      <Defs>
        {!color &&
          <LinearGradient
            id="paint0_linear_6513_6299"
            x1={1.64059}
            y1={1.5025}
            x2={1.64059}
            y2={13.7379}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={"#EAAFC8"} />
            <Stop offset={1} stopColor="#654EA3" />
          </LinearGradient>
        }
        <ClipPath id="clip0_6513_6299">
          <Path fill="#fff" d="M0 0H15V13.738H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
};
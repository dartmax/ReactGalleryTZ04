import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useClock from "./utils/useClock";
import "@testing-library/jest-dom/extend-expect"
import { mount, configure } from "enzyme";
import {act} from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16"
import ClockCenter from "./components/ClockCenter";
import TimeArrow from "./components/TimeArrow";

configure({adapter: new Adapter()});

const whenStable = async () =>
  await act( async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

describe('Testing second arrow angle', () => {
  it('should increment by 6 every seconds', async ()=>{
  const wrapper = mount(<ClockCenter />);
  await whenStable();
  wrapper.update();
  const secondsArrowProps = wrapper.find(TimeArrow).first().props();
  const secondAngle = secondsArrowProps.angle;
  expect(secondAngle).toBe(6);
  });
});

describe('Test minute arrow', () => {
  it('should not update minutes after one second and update only seconds', async ()=>{
    const {result, waitForNextUpdate} = renderHook(() => useClock());
    await waitForNextUpdate();

    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(1);
  });
});

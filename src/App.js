import React from "react"
import Buttons from "./components/Buttons"
import Popup from "./components/Popup"
import Inputs from "./components/Input"
import useToggle from "./hook/useToggle"
import Toast from "./components/Toast"
import Dropdown from "./components/Dropdown"
import Tooltip from "./components/Tooltip"
import { FiUser } from 'react-icons/fi'

function App() {

  const [popup, togglePopup] = useToggle(false)
  const [toast, toggleToast] = useToggle(false)

  const Submit = () => {
    togglePopup(false)
    toggleToast(true)
  }
  return (
    <div>
      <Toast
        open={toast}
        onClose={toggleToast}
        message='Form submitted successfully!'
        type='info'
        pos="bottom-right"
        duration={1000}
      />
      <Popup
        open={popup}
        onClose={() => togglePopup(false)}
      >
        <Inputs
          title="Box"
          type={'text'}
          required
          icon={<FiUser />}
        />
        <br />
        <Dropdown
          shape="circle"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
        />
        <br />
        <Tooltip
          content="Tooltip with fade animation!"
          placement="bottom"
          animation="fade"
          arrow={true}
        >
          <span>Hover me</span>
        </Tooltip>
        <Buttons type='success' onClick={Submit}>Submit</Buttons>
      </Popup>
      <Buttons
        onClick={() => togglePopup(true)}
        type='info'
      >
        Open Alert
      </Buttons>
    </div>
  );
}

export default App

import React from "react"
import { FiUser } from 'react-icons/fi'

import useToggle from "./hook/useToggle"

import {
  Button,
  Popup,
  Input,
  Toast,
  Dropdown,
  Tooltip,
  Box,
  Card
} from "./components/index"

function App() {

  const [popup, togglePopup] = useToggle(false)
  const [toast, toggleToast] = useToggle(false)

  const Submit = () => {
    togglePopup(false)
    toggleToast(true)
  }
  return (
    <div>
      <Popup
        open={popup}
        onClose={() => togglePopup(false)}
        hideWrap={true}
        position="bottom-right"
      >
        <Input
          title="Box"
          type={'text'}
          required
          icon={<FiUser />}
        />
        <br />
        <Card type="horizontal">
          <Card.Header type="horizontal" image="https://i.imgur.com/1WQLl9c.jpeg" />
          <Card.Content>
            Đây là nội dung chính của card ngang với ảnh. Bạn có thể thêm các
            đoạn văn bản hoặc thông tin ở đây.
          </Card.Content>
        </Card>
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
          placement="top"
          animation="fade"
          arrow={true}
        >
          <span>Hover me</span>
        </Tooltip>
        <Button type='success' onClick={Submit}>Submit</Button>
      </Popup>
      <Toast
        open={toast}
        onClose={toggleToast}
        message='Form submitted successfully!'
        type='info'
        pos="top-center"
        duration={1000}
      />
      <Box
        padding="1rem"
        margin=".4rem"
        background="#fff"
        border="1px solid #ccc"
        borderRadius=".4rem"
      >
        <Button
          onClick={() => togglePopup(true)}
          type='info'
        >
          Open Alert
        </Button>
      </Box>
      <Card boxShadow={'default'}>
        <Card.Header>Header Card Dọc</Card.Header>
        <Card.Content>
          Đây là nội dung chính của card dọc. Bạn có thể thêm các đoạn văn bản
          hoặc thông tin ở đây.
        </Card.Content>
        <Card.Footer>Footer Card Dọc</Card.Footer>
      </Card>
    </div>
  )
}

export default App

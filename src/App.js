import React from 'react'
import useToggle from './hook/useToggle'
import { Button, Popup, Card, Toast, Dropdown, Tooltip } from './components/index'

const App = () => {
  const [isOpen, togglePopup] = useToggle(false)
  const [isToast, toggleToast] = useToggle(false)

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  const PopupClose = () => {
    togglePopup(false)
    toggleToast(true)
  }
  return (
    <div className="p-5 space-y-4">
      <Button variant="primary" size="large" onClick={() => togglePopup(true)}>
        Open Popup
      </Button>

      <Popup open={isOpen} onClose={PopupClose}>
        <Card type="horizontal" width="40rem" height="auto" boxShadow="shadow-lg">
          <Card.Header width="20rem"
            image="https://via.placeholder.com/150x150.png?text=Card+Image"
          />
          <Card.Content>
            <p>
              This is a sample card inside a popup. You can customize the
              content as needed.
            </p>
            <Tooltip
              content="This is a tooltip"
              placement='right'
              delay={300}
              arrow={true}
              animation="fade"
              bgColor='rgba(0,0,0,.5)'
            >
              <Button>
                Hover me
              </Button>
            </Tooltip>
          </Card.Content>
        </Card>
        <Card type="vertical" width="40rem" height="auto" boxShadow="shadow-lg">
          <Card.Header>
            Card Header
          </Card.Header>
          <Card.Content>
            <p>
              This is a sample card inside a popup. You can customize the
              content as needed.
            </p>
            <Dropdown
              options={options}
              placeholder="Select an option"
              shape="rectangle"
            />
          </Card.Content>
          <Card.Footer>
            <Button
              variant="danger"
              size="small"
              onClick={PopupClose}
            >
              Close
            </Button>
          </Card.Footer>
        </Card>
      </Popup>
      <Toast
        open={isToast}
        onClose={() => toggleToast(false)}
        type={'success'}
        pos='top-center'
        message='Toast working!'
        duration={3000}
      />
    </div>
  );
};

export default App;

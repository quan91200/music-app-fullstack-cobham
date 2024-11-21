/* eslint-disable react-hooks/exhaustive-deps */
import
React,
{
    useEffect,
    useState,
    useCallback,
    useRef
} from 'react'
import styled from 'styled-components'
import { throttle } from 'lodash'

const SplitPane = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false)
    const [left, setLeft] = useState(null)
    const [right, setRight] = useState(null)
    const [leftW, setLeftW] = useState(null)
    const [rightW, setRightW] = useState(null)

    const [top, setTop] = useState(null)
    const [bottom, setBot] = useState(null)
    const [topH, setTopH] = useState(null)
    const [bottomH, setBotH] = useState(null)

    const [splitX, setSplitX] = useState(0)
    const [splitY, setSplitY] = useState(0)
    const [direct, setDirect] = useState(null)

    const workerRef = useRef(null)

    const onMouseDown = useCallback((dir) => (e) => {
        setIsDragging(true)
        setDirect(dir)

        let pE = e.target.previousElementSibling
        let nE = e.target.nextElementSibling

        if (!pE || !nE) {
            alert(`Missing sibling elements for direction: ${dir}`)
            setIsDragging(false)
            return
        }

        if (dir === 'row') {
            setLeft(pE)
            setRight(nE)
            setLeftW(pE.offsetWidth)
            setRightW(nE.offsetWidth)
            setSplitX(e.pageX)
        }

        if (dir === 'col') {
            setTop(pE)
            setBot(nE)
            setTopH(pE.offsetHeight)
            setBotH(nE.offsetHeight)
            setSplitY(e.pageY)
        }
    }, [])

    const throttledMouseMove = useCallback(
        throttle((e) => {
            const container = document.querySelector('.App')
            const conW = container.offsetWidth
            const conH = container.offsetHeight

            workerRef.current.postMessage({
                eX: e.pageX,
                eY: e.pageY,
                leftW: leftW,
                rightW: rightW,
                topH: topH,
                bottomH: bottomH,
                splitX: splitX,
                splitY: splitY,
                containerWidth: conW,
                containerHeight: conH,
                direct: direct,
            })
        }, 50),
        [leftW, rightW, topH, bottomH, splitX, splitY, direct]
    );

    const onMouseMove = (e) => throttledMouseMove(e)

    const onMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        workerRef.current = new Worker(new URL('./worker.js', import.meta.url))

        workerRef.current.onmessage = (e) => {
            const { leftPer, rightPer, topPer, botPer, isDragging } = e.data

            if (isDragging) {
                if (direct === 'row') {
                    left.style.width = `${leftPer}%`
                    right.style.width = `${rightPer}%`
                } else if (direct === 'col') {
                    top.style.height = `${topPer}%`
                    bottom.style.height = `${botPer}%`
                }
            } else {
                setIsDragging(false)
            }
        }

        return () => {
            workerRef.current.terminate()
        };
    }, [direct, left, right, top, bottom])

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }
    }, [isDragging, onMouseMove])

    const [topContent, bottomContent, rightContent] = React.Children.toArray(children)
    return (
        <Apps className='App'>
            <Left>
                <Top>{topContent}</Top>
                <SplitCol onMouseDown={onMouseDown('col')} />
                <Bottom>{bottomContent}</Bottom>
            </Left>
            <SplitRow onMouseDown={onMouseDown('row')} />
            <Right>{rightContent}</Right>
        </Apps>
    )
}

export default SplitPane;

const Apps = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: #302e2e;
`

const Left = styled.div`
    width: 30%;
    height: 100%;
    background-color: #302e2e;
    display: flex;
    flex-direction: column;
`

const Right = styled.div`
    flex: 1;
    height: 100%;
`

const SplitRow = styled.div`
    width: 8px;
    height: 100%;
    background-color: gray;
    cursor: ew-resize;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1e90ff;
    }
`

const Top = styled.div`
    height: 30%;
    width: 100%;
`

const Bottom = styled.div`
    flex-grow: 1;
    width: 100%;
`

const SplitCol = styled.div`
    width: 100%;
    height: 8px;
    background-color: gray;
    cursor: ns-resize;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1e90ff;
    }
`
import {AnimatePresence,motion} from "framer-motion"
const AnimationWrapper=({children,keyId,initial={opacity:0},animate={opacity:1},transition={duration:1}})=>{
    return <motion.div
        key={keyId}
        initial={initial}
        animate={animate}
        transition={transition}
    >
        {children}
    </motion.div>
}
export default AnimationWrapper;
import {AnimatePresence,motion} from "framer-motion"
const AnimationWrapper=({children,keyId,initial={opacity:0},animate={opacity:1},transition={duration:0.5},className})=>{
    return <AnimatePresence>
        <motion.div
            key={keyId}
            initial={initial}
            animate={animate}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    </AnimatePresence>
}
export default AnimationWrapper;
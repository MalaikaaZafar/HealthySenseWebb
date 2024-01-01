import React, {useEffect} from 'react';
import LoadingGIF from './LoadingGIF.gif';
import { motion, AnimatePresence, usePresence } from 'framer-motion';

const LoadingAnimation = ({isVisible}) => { 
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="loading-animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                     <img src={LoadingGIF} alt="Loading..." style={{ height: 'auto', width: 'auto', maxHeight: '500px', maxWidth: '500px', borderRadius: '100%' }} className='loadingGift' />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingAnimation
import { motion } from 'framer-motion';
import React from 'react';

function Motiondiv(props) {
  const { html } = props;
  const pagetransition = {
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  return (
    <motion.div variants={pagetransition} exit="out" animate="in" initial="out">
      {html}
    </motion.div>
  );
}
export default Motiondiv;

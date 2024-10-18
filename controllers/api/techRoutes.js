const router = require('express').Router();
const { Tech } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTech = await Tech.create({
      ...req.body,
      user_id: req.session.user_id,
    
    });
    console.log("New Blog: ", newTech)
    res.status(200).json(newTech);
  } catch (err) {
    console.log("err: ", err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const techData = await Tech.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!techData) {
      res.status(404).json({ message: 'No tech found with this id!' });
      return;
    }

    res.status(200).json(techtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/comment', (req, res) => {
  console.log("incoming data: ", req.body);
  // We need to Create a nEW Comment 
  
  // We need to Associate the NEW COMMENT with the CURRENT THOUGHT/POST
})

module.exports = router;

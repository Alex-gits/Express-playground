const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (!found) res.status(400).json({ msg: `No member with the id of ${req.params.id}` })

  res.json(members.find(member => member.id === parseInt(req.params.id)));
});

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' })
  }
  
  members.push(newMember);
  res.json(members);

  // res.render('index', {
  //   title: 'Member App',
  //   members
  // });

  // res.redirect('/');
})

// Update data
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (!found) {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  } else {
    const updData = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updData.name ? updData.name : member.name;
        member.email = updData.email ? updData.email : member.email
        
        res.json({ msg: 'Member updated', member, members })
      }
    })
  }

});

// Delete data
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (!found) res.status(400).json({ msg: `No member with the id of ${req.params.id}` })

  res.json({ msg: "Member has been deleted", members: members.filter(member => member.id !== parseInt(req.params.id)) });
});

module.exports = router;
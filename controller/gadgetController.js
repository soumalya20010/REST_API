import Gadget from '../models/gadget.js'; 

// Helper function to generate a random codename
const generateCodename = () => {
  const adjectives = ['The', 'Dark', 'Golden', 'Silent', 'Mighty'];
  const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Falcon', 'Wolf'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  };
  
  // POST /gadgets/:id/self-destruct - Trigger the self-destruct sequence for a specific gadget
  export const selfDestructGadget = async (req, res) => {
    try {
      const { id } = req.params;
      const { confirmationCode } = req.body;
      const gadget = await Gadget.findByPk(id);
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }
  
      // Simulate confirmation code generation and validation
      const generatedCode = generateConfirmationCode();
      if (confirmationCode !== generatedCode) {
        return res.status(400).json({ error: 'Invalid confirmation code' });
      }
  
      gadget.status = 'Destroyed';
      await gadget.save();
      res.status(200).json(gadget);
    } catch (error) {
      res.status(500).json({ error: 'Failed to trigger self-destruct sequence' });
    }
  };

// GET /gadgets - Retrieve all gadgets
export const getAllGadgets = async (req, res) => {
    try {
      const { status } = req.query;
      const whereClause = status ? { status } : {};
  
      const gadgets = await Gadget.findAll({ where: whereClause });
      const gadgetsWithProbability = gadgets.map((gadget) => ({
        ...gadget.toJSON(),
        missionSuccessProbability: Math.floor(Math.random() * 100) + 1,
      }));
      res.status(200).json(gadgetsWithProbability);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve gadgets' });
    }
  };

// POST /gadgets - Add a new gadget
export const addGadget = async (req, res) => {
  try {
    const { name } = req.body;
    const codename = generateCodename();
    const newGadget = await Gadget.create({ name, codename });
    res.status(201).json(newGadget);
  } catch (error) {
    console.error('Error adding gadget:', error);
    res.status(500).json({ error: 'Failed to add gadget' });
  }
};

// PATCH /gadgets/:id - Update a gadget
export const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    gadget.name = name;
    await gadget.save();
    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gadget' });
  }
};

// DELETE /gadgets/:id - Decommission a gadget
export const decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();
    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to decommission gadget' });
  }
};
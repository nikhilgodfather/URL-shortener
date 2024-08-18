const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const ShorTen = require('./models/Shorten-Url')
const app = express();
const cors = require('cors')
app.use(cors())
const PORT = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

mongoose.connect('mongodb://0.0.0.0/ShorTen-Url')
.then(()=>{
    console.log('Connected SuccessFully!')

})
.catch((err)=> {
    console.log('Error Occured Due To Connecting Mongoose..');
})


app.get('/api/v1/shorten-link', async (req, res) => {
    try {
        const ShortenData = await ShorTen.find().lean().exec();
        res.json(ShortenData);
    } catch (err) {
        console.error(`Error Occurred During Fetching Data: ${err}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/v1/shorten-link/:id', async (req, res)=>{
    const { id } = req.params;
    try{
     const ShortenLinkFinds = await ShorTen.findById({_id:id})
     res.json(ShortenLinkFinds)
    }catch(err){
      console.log(`Error Occured During Fetching Data! , ${err}`)
      res.json(`Error Occured During Fetching Data! , ${err}`)
    }
})
app.post('/api/v1/shorten-link', async (req, res)=>{
    const {username , description , tag, vanityURL , shortID } = req.body;
    try{
        const findShortenID = await ShorTen.find()
        const CheckShortenID = findShortenID.find(findShortenID=>findShortenID.shortid===shortID)
        if(CheckShortenID){
            return res.json({alert:"warning",message:"Entered Endpoint Already has been Used!, Use Another Endpoint!"})
        }else{
            const ShortenLinkData = new ShorTen({
                Username:username,
                description:description,
                Tag:tag,
                OrignalUrl:vanityURL,
                shortid:shortID,
               
            })
            const ShortenSave = await ShortenLinkData.save();
            if(ShortenSave){
                return res.json({alert:"success",message:"Data Inserted SuccessFully!"})
            }else{
                return res.json({alert:"danger",message:"Data was not Inserted , Try After Sometime!"})
              }
        }
        
    }catch(err){
        console.error(`Error During Making ShorTean Link! ${err}`)
    }
});

app.delete('/api/v1/delete/:id', async (req, res )=>{
    const { id } = req.params;
    try{
        const DeleteShorten = await ShorTen.findByIdAndDelete(id);
        if(!DeleteShorten){
            console.log(`Try Again! , After Sometime`)
        }
        const ShortenData = await ShorTen.find().lean().exec();
        res.json(ShortenData);
        console.log('Deleted Successfully!')
    }catch(err){
        console.error(`Error Occured During Deleting , ${err}`)
    }
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const shortenFinds = await ShorTen.findOne({ shortid: id });

        if (shortenFinds) {
            // Update the UrlClicks count
            shortenFinds.UrlClicks = (shortenFinds.UrlClicks || 0) + 1;
            await shortenFinds.save();

            res.redirect(shortenFinds.OrignalUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (err) {
        console.log(`Error Occured During Redirecting the Original URL, ${err}`);
        res.status(500).send('Server Error');
    }
});


app.get('/scan/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const shortenFinds = await ShorTen.findOne({ shortid: id });

        if (shortenFinds) {
            // Update the UrlClicks count
            shortenFinds.QrCodeClicks = (shortenFinds.QrCodeClicks || 0) + 1;
            await shortenFinds.save();

            res.redirect(shortenFinds.OrignalUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (err) {
        console.log(`Error Occured During Redirecting the Original URL, ${err}`);
        res.status(500).send('Server Error');
    }
});

app.put('/api/v1/update/shorten-link', async (req, res) => {
    const { _id, shortid, ...updateFields } = req.body;

    if (!_id) {
        return res.status(400).json({ alert: 'danger', message: 'ID is required to update the record.' });
    }

    try {
        // Find all records except the one being updated
        const findShortID = await ShorTen.find({ _id: { $ne: _id } });
        const CheckShortenID = findShortID.find(record => record.shortid === shortid);

        if (CheckShortenID) {
            return res.json({ alert: 'warning', message: 'Entered Endpoint already exists! Use another endpoint.' });
        }
        const updateData = await ShorTen.findByIdAndUpdate(_id, { shortid, ...updateFields }, { new: true });
        
        if (!updateData) {
            return res.status(404).json({ alert: 'danger', message: 'ShorTen Data not found!' });
        }

        res.status(200).json({ alert: 'success', message: 'ShorTen Data was updated!', data: updateData });
    } catch (error) {
        res.status(500).json({ alert: 'danger', message: 'Cannot update ShorTen Data!', error: error.message });
    }
});



app.listen(PORT, ()=>{
    console.log(`Server is Running On ${PORT}`);
})
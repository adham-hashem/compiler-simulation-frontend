import { Box, Typography, Grid, TextField, Button } from "@mui/material";

const ContactPage = () => {

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
            Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
            We’re here to help! If you have any questions, feedback, or inquiries about our platform, feel free to reach out. 
            Our team is always available to assist you.
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Reach Out to Us
            </Typography>
            <Typography variant="body1" gutterBottom>
            You can contact us through the following methods:
            </Typography>
            <ul>
            <li>
                <Typography variant="body1">
                <strong>Email:</strong> support@NoteMaster.com
                </Typography>
            </li>
            <li>
                <Typography variant="body1">
                <strong>Phone:</strong> +123-456-7890
                </Typography>
            </li>
            <li>
                <Typography variant="body1">
                <strong>Address:</strong> 123 Main Street, City, Country
                </Typography>
            </li>
            </ul>
    
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Send Us a Message
            </Typography>
            <Typography variant="body1" gutterBottom>
            You can also send us a message directly using the form below, and we will get back to you as soon as possible:
            </Typography>
    
            {/* Contact Form */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Your Name" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Your Email" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Subject" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Message" fullWidth required multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Send Message
                    </Button>
                </Grid>
            </Grid>
        </Box>
        );
}

export default ContactPage;
import { Box, Typography } from "@mui/material"
import Header from "../../app/layout/Header"

const About = () => {


    return (
      <>
        <Header />
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" gutterBottom>
            At <strong>Note Master</strong>, we believe in simplifying the way students and professionals manage their notes. 
            Our mission is to create a seamless and collaborative platform that empowers users to store, organize, and share their subject notes effortlessly. 
            We aim to foster a community of learners who can easily access and build upon their knowledge, ensuring that no idea is ever lost.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            What We Offer
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our platform provides a range of powerful features designed to make note-taking and organization efficient:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                <strong>Effortless Organization:</strong> Easily categorize your notes by subject, making it simple to find exactly what you're looking for.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Cloud Storage:</strong> All your notes are securely stored in the cloud, ensuring you never lose important information and can access it anywhere, anytime.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Track Your Progress:</strong> Stay on top of your study or work goals by tracking what you’ve covered and what still needs attention.
              </Typography>
            </li>
            {/* <li>
              <Typography variant="body1">
                <strong>Intuitive Search:</strong> Use our powerful search tools to filter notes by date, subject, or custom tags to quickly retrieve the information you need.
              </Typography>
            </li> */}
          </ul>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Our Story
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Note Master</strong> was founded with the goal of addressing a common challenge faced by students and professionals alike — managing a growing collection of subject notes. 
            Our team, made up of experienced educators and developers, saw a need for a platform that stores notes, creativity, and organization. 
            By combining cutting-edge technology with an intuitive user experience, we have built a platform that helps users make the most out of their knowledge and stay organized in today’s fast-paced world.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Join Us Today
          </Typography>
          <Typography variant="body1" gutterBottom>
            Whether you're a student, professional, or lifelong learner, <strong>Note Master</strong> is here to help you succeed. 
            Sign up today and start organizing your notes in a smarter, more efficient way.
          </Typography>
        </Box>
      </>
      );
}


export default About;
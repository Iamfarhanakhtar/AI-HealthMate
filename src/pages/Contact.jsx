import React from 'react';
import SectionTitle from '../components/UI/SectionTitle';
import Container from '../components/UI/Container';
import GlassPanel from '../components/UI/GlassPanel';
import Input from '../components/UI/Input';
import Textarea from '../components/UI/Textarea';
import Button from '../components/UI/Button';

function Contact() {
  return (
    <Container className="py-10">
      <SectionTitle
        title="Community Feedback Form"
        subtitle="Share Your Voice"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <GlassPanel className="p-6">
          <form className="flex flex-col gap-4">
            <Input label="Your Name" placeholder="e.g. Ramesh Patel" />
            <Input label="Village / School Location" placeholder="e.g. Sonapur High School" />
            <Textarea label="Health Concerns or Feedback" placeholder="Share any sanitations topics or general issues..." />
            <Button variant="primary">Submit Feedback</Button>
          </form>
        </GlassPanel>
        <div id="feedback-bulletin-container"></div>
      </div>
    </Container>
  );
}

export default Contact;

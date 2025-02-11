import { Body, Button, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

type EmailConfirmationProps = {
  username: string;
  emailConfirmationLink: string;
};

export default function EmailConfirmation({ username = 'User', emailConfirmationLink = '/' }: EmailConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>TechNest confirm your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Thank you for signing up with TechNest! To complete your registration and verify your email address,
              please click the link below:
            </Text>
            <Button style={button} href={emailConfirmationLink}>
              Confirm Email
            </Button>
            <Text style={text}>If you did not request this, please ignore this email.</Text>
            <Text style={text}>
              If you have any questions, feel free to contact our support team at support@technest.com.
            </Text>
            <Text style={{ ...text, marginBottom: 0 }}>Best regards,</Text>
            <Text style={{ ...text, marginTop: 0 }}>TechNest</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  padding: '45px',
  borderRadius: '0.5rem',
};

const text = {
  fontSize: '16px',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  color: '#030712',
};

const button = {
  backgroundColor: '#7c3aed',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  fontSize: '14px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 12px',
};

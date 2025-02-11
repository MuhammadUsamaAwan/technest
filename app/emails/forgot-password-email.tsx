import { Body, Button, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

type ForgotPasswordEmailProps = {
  username: string;
  url: string;
};

export default function ForgotPasswordEmail({ username = 'User', url = '/' }: ForgotPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>TechNest Password Reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              We received a request to reset your password for your TechNest account. Click the link below to reset your
              password:
            </Text>
            <Button style={button} href={url}>
              Reset Password
            </Button>
            <Text style={text}>If you did not request a password reset, please ignore this email.</Text>
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

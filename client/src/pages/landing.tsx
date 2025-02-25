import React from 'react';

// Assume these components are imported from a UI library
const DialogContent = ({ children }) => <div>{children}</div>;
const DialogHeader = ({ children }) => <header>{children}</header>;
const DialogTitle = ({ children }) => <h3>{children}</h3>;
const DialogDescription = ({ children }) => <p>{children}</p>;


const LandingPage = () => {
  return (
    <div>
      {/* Example usage of DialogContent with added descriptions */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support Development</DialogTitle>
          <DialogDescription>
            Scan the QR code or use the GCash number below to support the development of this app.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Another Dialog Title</DialogTitle>
          <DialogDescription>
            This is another dialog with a description.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>


      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Information about how we handle your data and privacy.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </div>
  );
};

export default LandingPage;
import React from "react";
import Image from "next/image";

export default function ProfileIcon() {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABqElEQVR4nO2Wu0oDURCG8wKJJqiFN+wUI2ipb2AsxBDsrLQRr4WPoWitQe0ttNCgpb6BTSAoNkltNFFUcMMnB0Y4hGTOZpOgRX4YOMzOvx9zdvbshkId/TcBw8AmcAPkgHeJnOQ2gKFWAgeAQ8DDrQpwBow0C10A3mhcZWA+KHRbOggq490K0mmlCagN99c5MBhwe7Vt7/cDPnbcKA+kgLBEUiZbU9rPK+M5oLEavhhQUHye2UkNbN5TTSmpmxOQiYTkFh3edQ187TCHpc7uLi+5iMOb0cCPmtOq85WvUk4DmwkM2nGXw1vWwCWHOSl1CRk0E7OSM5OuqaSBsw5zTpnqB4c3q4EzuFWQCY5IpHxAja408Brt06oG7gW+2wD1gL66YIGn65g/gXNgCZgEuiWmJHchNbV0pEKtrouW6QvYBaI+vFFgTzy/egZ6nGDrs+jJgTJq5WeAA+AeeJUw631g2qobA57ksTX2QwCsAHFZx4E7H8/yFhgXzwSw3BC0WsBLA4NUDLVKwInPaTc1py0DW38mO+YgkKPyQ8KsL+Va/W9uR6E/0g8Ja6QRMvwT+QAAAABJRU5ErkJggg=="
      width={24}
      height={24}
      alt="profile-icon"
    />
  );
}

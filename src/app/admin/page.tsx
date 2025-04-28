import AdminInterface from 
"@/components/AdminInterface"
;
import profileData from 
"@/data/user_profile_data.json"
; // Updated path for deployment

// This page will fetch the initial data and pass it to the client component
// In a real app, this data might come from a database or CMS

export default function AdminPage() {
  // We are directly importing the JSON data here for simplicity
  // Ensure the path to user_profile_data.json is correct relative to the server environment
  const initialData = profileData;

  return (
    <AdminInterface />
  );
}


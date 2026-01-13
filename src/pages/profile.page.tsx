import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import {
  getUserData,
  createUserData,
  updateUserData,
  type UserDataDto,
} from "@/features/profile/api/user-data.api";
import {
  PersonalInfoCard,
  GovernmentDocCard,
  EmploymentCard,
  IncomeCard,
} from "@/features/profile/components";
import type { FormData } from "@/features/profile/types/profile.types";
import { emptyFormData } from "@/features/profile/types/profile.types";

function ProfilePage() {
  const { isAuthenticated, user, showLoginModal } = useAuth();
  const [userData, setUserData] = useState<UserDataDto | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user?.userId) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getUserData();
        setUserData(data);

        if (data) {
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            governmentDocumentTypeId: data.governmentDocumentTypeId,
            governmentDocumentNumber: data.governmentDocumentNumber,
            jobTypeId: data.jobTypeId,
            jobStartDate: data.jobStartDate,
            jobEndDate: data.jobEndDate || "",
            incomeAmount: data.incomeAmount,
            incomeCurrency: data.incomeCurrency,
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [user?.userId]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;

    setIsSaving(true);
    setError(null);

    try {
      const dataToSave = {
        ...formData,
        jobEndDate: formData.jobEndDate || null,
      };

      if (userData) {
        const updated = await updateUserData(dataToSave);
        setUserData(updated);
      } else {
        const created = await createUserData(dataToSave);
        setUserData(created);
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save user data:", err);
      setError("Failed to save profile data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthDate: userData.birthDate,
        governmentDocumentTypeId: userData.governmentDocumentTypeId,
        governmentDocumentNumber: userData.governmentDocumentNumber,
        jobTypeId: userData.jobTypeId,
        jobStartDate: userData.jobStartDate,
        jobEndDate: userData.jobEndDate || "",
        incomeAmount: userData.incomeAmount,
        incomeCurrency: userData.incomeCurrency,
      });
    } else {
      setFormData(emptyFormData);
    }
    setIsEditing(false);
    setError(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Please sign in to view and manage your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={showLoginModal}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-8">
        <div className="text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  const hasUserData = userData !== null;
  const isFormDisabled = hasUserData && !isEditing;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          {hasUserData
            ? "View and manage your personal information"
            : "Complete your profile to apply for loans"}
        </p>
      </div>

      {error && (
        <div className="w-full max-w-2xl mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
        <PersonalInfoCard
          formData={formData}
          disabled={isFormDisabled}
          onInputChange={handleInputChange}
        />

        <GovernmentDocCard
          formData={formData}
          disabled={isFormDisabled}
          onInputChange={handleInputChange}
        />

        <EmploymentCard
          formData={formData}
          disabled={isFormDisabled}
          onInputChange={handleInputChange}
        />

        <IncomeCard
          formData={formData}
          disabled={isFormDisabled}
          onInputChange={handleInputChange}
        />

        <div className="flex justify-end gap-4">
          {hasUserData ? (
            isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit User Data
              </Button>
            )
          ) : (
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Add User Data"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;

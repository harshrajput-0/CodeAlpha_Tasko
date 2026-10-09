import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/me");

        const user = response.data?.data;

        setFormData({
          fullName: user?.fullName || "",
          email: user?.email || "",
          avatar: user?.avatar || "",
          bio: user?.bio || "",
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.patch("/users/update-profile", {
        fullName: formData.fullName,
        email: formData.email,
        avatar: formData.avatar,
        bio: formData.bio,
      });

      navigate("/profile");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            Edit profile
          </CardTitle>

          <CardDescription>
            Update your personal information and profile details.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>

              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>

              <Input
                id="avatar"
                name="avatar"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={formData.avatar}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>

              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us a little about yourself..."
                value={formData.bio}
                onChange={handleChange}
                maxLength={300}
                rows={5}
              />

              <p className="text-right text-xs text-muted-foreground">
                {formData.bio.length}/300
              </p>
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

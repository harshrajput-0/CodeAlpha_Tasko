import { Mail, UserPlus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

export function InviteModal() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          Invite Member
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-112.5 p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="size-5" />
            Invite Team Member
          </DialogTitle>

          <DialogDescription>
            Inviting to workspace:{' '}
            <span className="font-medium text-blue-600">TS Components</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>

            <Select defaultValue="member">
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                style={{
                  width: 'var(--radix-select-trigger-width)',
                }}
              >
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogTrigger>

            <Button type="submit">Send Invitation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

-- ANTARIKSH — SUPABASE DATABASE MIGRATION SCRIPT
-- PostgreSQL DDL for Supabase SQL Editor (Audited & Production-Hardened)

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. CREATE ENUMS
-- ==========================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AcademicYear') THEN
    CREATE TYPE "AcademicYear" AS ENUM ('FY', 'SY', 'TY', 'BTech');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Domain') THEN
    CREATE TYPE "Domain" AS ENUM ('ASTRONOMY', 'DEV', 'DESIGN', 'OUTREACH', 'MANAGEMENT');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
    CREATE TYPE "Role" AS ENUM ('ADMIN', 'CORE_TEAM', 'VOLUNTEER', 'MEMBER');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'EventType') THEN
    CREATE TYPE "EventType" AS ENUM ('STARGAZING', 'WORKSHOP', 'GUEST_LECTURE', 'OUTREACH', 'TECHNICAL_VISIT');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ArchiveCategory') THEN
    CREATE TYPE "ArchiveCategory" AS ENUM (
      'RESEARCH_PAPER',
      'TECHNICAL_REPORT',
      'SESSION_MINUTES',
      'NEWSLETTER',
      'PRESENTATION_SLIDES'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ProjectStatus') THEN
    CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'ONGOING');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ApplicationStatus') THEN
    CREATE TYPE "ApplicationStatus" AS ENUM (
      'PENDING',
      'SHORTLISTED',
      'INTERVIEW_SCHEDULED',
      'ACCEPTED',
      'REJECTED',
      'WAITLISTED'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'RegistrationStatus') THEN
    CREATE TYPE "RegistrationStatus" AS ENUM ('CONFIRMED', 'WAITLISTED', 'CANCELLED', 'ATTENDED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
    CREATE TYPE "PaymentStatus" AS ENUM ('FREE', 'PENDING', 'PAID', 'REFUNDED');
  END IF;
END $$;

-- ==========================================
-- 2. CREATE TABLES
-- ==========================================

-- 1. Member
CREATE TABLE IF NOT EXISTS "Member" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "authId" TEXT UNIQUE, -- Links to Supabase auth.users.id
  "avatarImageUrl" TEXT,
  "department" TEXT NOT NULL,
  "academicYear" "AcademicYear",
  "domain" "Domain" NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'MEMBER',
  "isAlumni" BOOLEAN NOT NULL DEFAULT false,
  "passoutYear" INT,
  "currentCompany" TEXT,
  "designation" TEXT,
  "linkedinUrl" TEXT,
  "githubUrl" TEXT,
  "instagramUrl" TEXT,
  "bio" TEXT,
  "joinedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for Member
CREATE INDEX IF NOT EXISTS "Member_isAlumni_idx" ON "Member"("isAlumni");
CREATE INDEX IF NOT EXISTS "Member_slug_idx" ON "Member"("slug");

-- 2. HeroBanner (Landing Page)
CREATE TABLE IF NOT EXISTS "HeroBanner" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "tagline" TEXT NOT NULL,
  "bannerImageUrl" TEXT NOT NULL,
  "actionLabel" TEXT NOT NULL,
  "actionUrl" TEXT NOT NULL,
  "priority" INT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "HeroBanner_priority_isActive_idx" ON "HeroBanner"("priority", "isActive");
CREATE INDEX IF NOT EXISTS "HeroBanner_isActive_idx" ON "HeroBanner"("isActive");

-- 3. Event
CREATE TABLE IF NOT EXISTS "Event" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "slug" TEXT UNIQUE NOT NULL,
  "title" TEXT NOT NULL,
  "eventType" "EventType" NOT NULL,
  "summary" TEXT NOT NULL,
  "agenda" TEXT,
  "bannerImageUrl" TEXT NOT NULL,
  "venue" TEXT NOT NULL,
  "startDate" TIMESTAMPTZ NOT NULL,
  "endDate" TIMESTAMPTZ, -- Nullable per §3 spec for single-session events
  "registrationUrl" TEXT,
  "capacity" INT,
  "registrationQrImageUrl" TEXT,
  "momContent" TEXT,
  "slidesUrl" TEXT,
  "resourceLinks" JSONB,
  "metaDescription" TEXT,
  "ogImageUrl" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "Event_startDate_idx" ON "Event"("startDate");
CREATE INDEX IF NOT EXISTS "Event_slug_idx" ON "Event"("slug");

-- 4. GalleryMedia
CREATE TABLE IF NOT EXISTS "GalleryMedia" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "mediaImageUrl" TEXT NOT NULL,
  "caption" TEXT,
  "takenDate" TIMESTAMPTZ,
  "hashtags" TEXT[] DEFAULT '{}',
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "eventId" TEXT REFERENCES "Event"("id") ON DELETE SET NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "GalleryMedia_isFeatured_idx" ON "GalleryMedia"("isFeatured");
CREATE INDEX IF NOT EXISTS "GalleryMedia_takenDate_idx" ON "GalleryMedia"("takenDate");

-- 5. ArchiveResource (Category 1: Research & Documentation)
CREATE TABLE IF NOT EXISTS "ArchiveResource" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "category" "ArchiveCategory" NOT NULL,
  "description" TEXT,
  "fileUrl" TEXT NOT NULL,
  "publicationDate" TIMESTAMPTZ NOT NULL,
  "tags" TEXT[] DEFAULT '{}',
  "authorId" TEXT REFERENCES "Member"("id") ON DELETE SET NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "ArchiveResource_category_idx" ON "ArchiveResource"("category");
CREATE INDEX IF NOT EXISTS "ArchiveResource_publicationDate_idx" ON "ArchiveResource"("publicationDate");

-- 5. Project (Category 2: Historical & Project Logs)
CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "description" TEXT,
  "coverImageUrl" TEXT NOT NULL,
  "status" "ProjectStatus" NOT NULL,
  "reportUrl" TEXT,
  "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "Project_status_idx" ON "Project"("status");
CREATE INDEX IF NOT EXISTS "Project_isHighlighted_idx" ON "Project"("isHighlighted");
CREATE INDEX IF NOT EXISTS "Project_slug_idx" ON "Project"("slug");

-- ProjectContributor (Join Table)
CREATE TABLE IF NOT EXISTS "ProjectContributor" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "projectId" TEXT NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE,
  "memberId" TEXT NOT NULL REFERENCES "Member"("id") ON DELETE CASCADE,
  "roleInProject" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "ProjectContributor_projectId_memberId_key" UNIQUE ("projectId", "memberId")
);

CREATE INDEX IF NOT EXISTS "ProjectContributor_memberId_idx" ON "ProjectContributor"("memberId");
CREATE INDEX IF NOT EXISTS "ProjectContributor_projectId_idx" ON "ProjectContributor"("projectId");

-- 6. RecruitmentApplication
CREATE TABLE IF NOT EXISTS "RecruitmentApplication" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "vitEmail" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "branch" TEXT NOT NULL,
  "academicYear" "AcademicYear" NOT NULL,
  "interests" TEXT NOT NULL,
  "domainPreference" "Domain",
  "cycle" TEXT NOT NULL,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
  "interviewSlot" TIMESTAMPTZ,
  "reviewedById" TEXT REFERENCES "Member"("id") ON DELETE SET NULL,
  "appliedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "RecruitmentApplication_vitEmail_cycle_key" UNIQUE ("vitEmail", "cycle")
);

-- 8. Announcement
CREATE TABLE IF NOT EXISTS "Announcement" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "coverImageUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "Announcement_isPublished_publishedAt_idx" ON "Announcement"("isPublished", "publishedAt");

-- 9. SiteSettings (Singleton pattern hardcoded to id = 1)
CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" INT PRIMARY KEY DEFAULT 1 CHECK ("id" = 1),
  "contactEmail" TEXT NOT NULL,
  "phone" TEXT,
  "instagramUrl" TEXT,
  "linkedinUrl" TEXT,
  "twitterUrl" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. EventRegistration
CREATE TABLE IF NOT EXISTS "EventRegistration" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "eventId" TEXT NOT NULL REFERENCES "Event"("id") ON DELETE CASCADE,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "collegeOrOrg" TEXT NOT NULL,
  "status" "RegistrationStatus" NOT NULL DEFAULT 'CONFIRMED',
  "qrCodeImageUrl" TEXT,
  "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'FREE',
  "transactionId" TEXT,
  "refundAmount" NUMERIC(10, 2),
  "refundedAt" TIMESTAMPTZ,
  "customResponses" JSONB,
  "registeredAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "EventRegistration_eventId_email_key" UNIQUE ("eventId", "email")
);

-- ==========================================
-- 3. SUPABASE AUTH USER TRIGGER (AUDITED & COLLISION-PROOF)
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
BEGIN
  -- 1. Format name to slug base safely
  base_slug := lower(regexp_replace(COALESCE(new.raw_user_meta_data->>'full_name', 'member'), '[^a-zA-Z0-9]', '-', 'g'));
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  IF base_slug = '' THEN
    base_slug := 'member';
  END IF;

  -- 2. Append random hex bytes to guarantee zero unique slug collision crashes
  final_slug := base_slug || '-' || encode(gen_random_bytes(4), 'hex');

  INSERT INTO public."Member" (
    "id", "name", "slug", "email", "authId", "department", "domain", "role", "joinedAt", "createdAt", "updatedAt"
  )
  VALUES (
    gen_random_uuid()::text,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New Member'),
    final_slug,
    new.email,
    new.id::text,
    'General',
    'ASTRONOMY',
    'MEMBER',
    now(),
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger before creation to prevent "CREATE OR REPLACE TRIGGER" syntax errors across Postgres versions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 4. INITIAL SEED FOR SINGLETONS
-- ==========================================

INSERT INTO "SiteSettings" ("id", "contactEmail")
VALUES (1, 'antariksh@vit.edu')
ON CONFLICT ("id") DO NOTHING;

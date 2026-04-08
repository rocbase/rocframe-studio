# RØCFRAME Agent App Master Spec

## Vision

Build an agent-powered creative operating system for RØCFRAME.

The app should take a high-level brand brief like:

> Sleek black frame, glowing gold label, matte-black art tube, certificate and thank-you insert, deep-purple cosmic backdrop, violet-to-gold nebula light.

And turn it into a structured, reusable production workflow that outputs:

- image-generation prompts
- packaging concepts
- brand-safe copy
- certificate and insert text
- product launch assets
- approval-ready export packs

## The Real Problem

Right now, the creative process lives inside scattered chat threads and one-off prompts.

That creates five problems:

- brand direction gets lost between sessions
- visual consistency breaks across assets
- packaging, copy, and renders are made separately instead of as one system
- approvals are slow because there is no single source of truth
- every new product launch starts from scratch

The app should fix that by turning creative direction into a repeatable system.

## Smart MVP

### Core Outcome

A founder or creative lead submits one creative brief and gets back a complete launch kit draft.

### MVP Users

- founder / creative director
- brand operator
- freelance designer or content producer

### MVP Inputs

- brand name
- collection or product name
- creative direction
- materials and finish
- color palette
- packaging components
- tone of voice
- required deliverables

### MVP Outputs

- hero scene prompt
- product lineup prompt
- packaging spec sheet
- certificate copy
- thank-you insert copy
- launch description
- asset checklist

## Product Concept

Working name: **RØCFRAME Studio**

Positioning:

- luxury creative command center
- agent-assisted product launch builder
- purpose-built for collectible art, premium packaging, and cinematic brand presentation

## Core User Flow

1. User creates a new project.
2. User enters a brief for a product or collection.
3. The Orchestrator Agent breaks the brief into sub-jobs.
4. Specialist agents generate visual direction, packaging, copy, and validation.
5. The app shows outputs in a review board.
6. User approves, revises, or regenerates specific sections.
7. The app exports a clean launch pack.

## Agent System

### 1. Orchestrator Agent

Role:

- reads the user brief
- creates the task graph
- assigns work to specialist agents
- tracks completion state

Responsibilities:

- decide which agents need to run
- maintain project memory
- merge outputs into one coherent delivery

### 2. Brand Guardian Agent

Role:

- protect the RØCFRAME identity

Responsibilities:

- enforce brand palette, tone, and material language
- reject outputs that drift from the canon
- maintain reusable brand rules

### 3. Visual Director Agent

Role:

- convert brand intent into cinematic image prompts

Responsibilities:

- generate prompt variants
- define lighting, composition, mood, and scene language
- create shot lists for hero, product lineup, and detail scenes

### 4. Packaging Architect Agent

Role:

- turn the brief into physical packaging concepts

Responsibilities:

- define frame finish and label treatment
- define tube finish and seal treatment
- define insert and certificate formatting guidance
- create packaging consistency rules

### 5. Copy Agent

Role:

- generate all text assets

Responsibilities:

- certificate wording
- thank-you insert
- product description
- premium short-form brand copy

### 6. QA Agent

Role:

- check the final set before export

Responsibilities:

- verify every required output exists
- flag brand inconsistency
- flag missing components or conflicting instructions

## Example Agent Run For The Current Brief

Input brief:

- deep-purple cosmic background
- black frame
- glowing gold RØCFRAME label on back
- matte-black art tube with gold seal
- certificate of authenticity
- thank-you insert in matching palette
- violet-to-gold nebula spotlight

Expected agent output:

- a hero prompt for the frame alone
- a cinematic lineup prompt for all packaging pieces
- a luxury packaging spec for black-and-gold materials
- certificate copy with premium tone
- insert copy with gratitude and brand mythology
- QA check confirming the whole set feels unified

## Core Screens

### 1. Brief Composer

Where the user defines the project.

Key elements:

- structured brief form
- freeform prompt box
- brand references
- required deliverables checklist

### 2. Agent Workspace

Where the app shows which agents are running and what they produced.

Key elements:

- live task timeline
- agent status cards
- expandable reasoning summaries
- regenerate by section

### 3. Review Board

Where the user compares outputs and approves changes.

Key elements:

- prompt cards
- copy cards
- packaging blocks
- approve / revise / reject actions

### 4. Export Center

Where the user downloads or pushes assets outward.

Key elements:

- export bundle
- prompt pack
- copy pack
- packaging brief
- future Shopify / CMS integration

## Suggested Architecture

Keep the first version simple.

### Frontend

- Next.js
- TypeScript
- Tailwind
- component library with a premium editorial feel

### Backend

- Next.js server routes or a small API layer
- PostgreSQL for project state
- object storage for generated assets and references
- background job runner for agent tasks

### AI Layer

- OpenAI Responses API for agent reasoning and content generation
- image generation pipeline for visual prompt execution
- structured JSON outputs for agent handoff

### Orchestration

- one supervisor workflow
- multiple specialist prompts
- shared project memory
- retry and approval checkpoints

### Best MVP Stack

Use this unless complexity forces a split:

- Next.js app
- Postgres
- Inngest or Trigger.dev for async jobs
- OpenAI API
- Vercel for deployment

This gives speed without overbuilding.

## Data Model

### Main Entities

- `brands`
- `projects`
- `briefs`
- `agent_runs`
- `assets`
- `approvals`
- `exports`

### Important Relationships

- one brand has many projects
- one project has one active brief and many revisions
- one project triggers many agent runs
- many assets belong to one project

## Automation Opportunities

This app becomes valuable when repeated work disappears.

High-leverage automations:

- auto-generate a launch kit from a saved brand template
- auto-create certificate and insert copy for every new product
- auto-score outputs for brand alignment
- auto-build prompt variations for ads, store banners, and social posts
- auto-prepare product metadata for ecommerce

## Roadmap

### Phase 1

Define the brand system and build the brief-to-output workflow.

Deliver:

- project creation
- brief intake
- orchestrator logic
- four specialist agents
- review board
- export pack

### Phase 2

Add media generation and stronger memory.

Deliver:

- image prompt execution
- version history
- saved brand rules
- reusable templates

### Phase 3

Turn it into a scalable creative platform.

Deliver:

- multi-brand support
- collaboration and approvals
- ecommerce integrations
- content calendar generation
- launch automation

## Success Metrics

- time from brief to launch kit
- number of revisions per launch
- output approval rate
- brand consistency score
- percentage of reusable assets per new product

## Founder-Level Insight

The strongest version of this product is not an image generator.

It is a **brand operating system**:

- one place where aesthetic direction becomes process
- one memory layer that keeps the brand coherent
- one agent workflow that scales taste into production

That is the real leverage.

## Recommended Next Move

Build the MVP around one promise:

**"Give us one luxury product brief, and we will return a brand-consistent launch kit generated by a team of specialized agents."**

That is narrow enough to ship fast and strong enough to become a platform later.

## Execution Plan

### Milestone 1: Foundation

Goal:

- create the app shell and core data model

Build:

- auth
- project creation
- brief composer
- brand profile storage
- project dashboard

### Milestone 2: Agent Core

Goal:

- make one brief produce structured outputs

Build:

- orchestrator workflow
- Brand Guardian prompt
- Visual Director prompt
- Packaging Architect prompt
- Copy Agent prompt
- QA Agent prompt
- JSON schema for each output

### Milestone 3: Review + Revision

Goal:

- let users control the outputs without rerunning everything

Build:

- review board
- approve / reject / revise actions
- section-level regeneration
- version history

### Milestone 4: Export Pack

Goal:

- turn the work into a useful deliverable

Build:

- launch kit export
- prompt pack export
- certificate copy export
- packaging brief export

### Milestone 5: Visual Generation

Goal:

- connect outputs to image generation and creative production

Build:

- render prompt execution
- image result storage
- variation generation
- selection and lock workflow

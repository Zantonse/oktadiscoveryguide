# Mobile Testing Guide - Discovery Guide App

## Quick Start Testing

### 1. Start the Development Servers

```bash
# Terminal 1 - Start backend
cd server
npm install
npm run dev

# Terminal 2 - Start frontend
cd client
npm install
npm run dev
```

**Access:** http://localhost:5173

---

## Mobile Testing Checklist

### 📱 Device Viewport Testing

Test these viewport sizes using Chrome DevTools:

#### iPhone SE (375×667)
- [ ] Header displays correctly (logo + title compact)
- [ ] Sidebar toggle button visible
- [ ] Mobile nav at bottom visible
- [ ] Chat messages fit within screen
- [ ] Send button is 48×48px (easy to tap)
- [ ] Timestamps visible on all messages

#### iPhone 14 (390×844)
- [ ] All elements scale appropriately
- [ ] Safe area insets respected
- [ ] Mobile drawer slides in from right
- [ ] Overlay dismisses drawer on tap
- [ ] Bottom nav has safe area padding

#### iPhone 14 Pro Max (430×932)
- [ ] Larger screen uses space well
- [ ] Chat messages not too wide
- [ ] Mobile nav icons and labels clear

#### iPad Mini (768×1024)
- [ ] Switches to desktop layout
- [ ] Mobile nav disappears
- [ ] Desktop view tabs appear in header
- [ ] Sidebar inline (not drawer)
- [ ] Touch targets still comfortable

#### Android Phone (360×640)
- [ ] Everything fits (smallest test)
- [ ] No horizontal scrolling
- [ ] Text remains readable
- [ ] Touch targets still 44×44px minimum

---

## Chrome DevTools Mobile Testing

### Enable Device Toolbar
1. Open Chrome DevTools (F12 or Cmd+Option+I)
2. Click device toolbar icon (Cmd+Shift+M)
3. Select device from dropdown

### Test Each Viewport
For each device size, check:

#### Header
- [ ] Logo visible and properly sized
- [ ] Title text doesn't overflow
- [ ] Subtitle hidden on mobile (<768px)
- [ ] View tabs hidden on mobile
- [ ] Icon buttons easy to tap (44×44px)
- [ ] Session buttons visible when active

#### Sidebar
- [ ] Toggle button in bottom-right corner
- [ ] Tapping toggle opens/closes drawer
- [ ] Drawer slides smoothly from right
- [ ] Overlay appears when drawer open
- [ ] Tapping overlay closes drawer
- [ ] Collapse state persists on reload
- [ ] Status cards stack vertically
- [ ] Timer, Interest, Progress all visible

#### Chat Interface
- [ ] Messages align correctly
- [ ] User messages on right (blue)
- [ ] Assistant messages on left (gray)
- [ ] Avatars display properly
- [ ] Timestamps visible without hover
- [ ] Messages don't exceed 90% width
- [ ] Scrolling smooth (momentum)
- [ ] New messages auto-scroll

#### Chat Input
- [ ] Input field expands with text
- [ ] Send button always visible (48×48px)
- [ ] Placeholder text visible
- [ ] Focus doesn't zoom page (iOS)
- [ ] "Tap send button" hint on mobile
- [ ] Input has rounded corners
- [ ] Border highlights on focus (blue)

#### Mobile Navigation
- [ ] Fixed at bottom of screen
- [ ] 4 tabs visible: Learn, Drill, Practice, Analyze
- [ ] Icons and labels both visible
- [ ] Active tab highlighted (blue + top bar)
- [ ] Tap feedback (ripple effect)
- [ ] Safe area padding on notched devices

---

## Interaction Testing

### Sidebar Drawer
1. [ ] Start with sidebar collapsed
2. [ ] Tap toggle button → drawer slides in from right
3. [ ] Overlay appears behind drawer
4. [ ] Tap overlay → drawer closes
5. [ ] Tap toggle again → drawer opens
6. [ ] Reload page → drawer state persists
7. [ ] Select industry, stakeholder, scenario
8. [ ] Start conversation
9. [ ] Drawer still functional during conversation

### Mobile Navigation
1. [ ] Tap "Learn" → Learn section appears
2. [ ] Active indicator shows on Learn tab
3. [ ] Tap "Drill" → switches to Drill
4. [ ] Active indicator moves to Drill tab
5. [ ] Tap "Practice" → back to main chat
6. [ ] Tap "Analyze" → analyze section
7. [ ] Smooth transitions between sections

### Chat Conversation
1. [ ] Select industry (e.g., Financial Services)
2. [ ] Select stakeholder (e.g., CISO)
3. [ ] Tap "Start Conversation"
4. [ ] Opening message appears from stakeholder
5. [ ] Type message in input
6. [ ] Tap send button
7. [ ] Message appears on right (user)
8. [ ] Timestamp visible below message
9. [ ] Loading indicator appears
10. [ ] Response streams in from assistant
11. [ ] Timestamp in assistant message header
12. [ ] Interest level updates in sidebar
13. [ ] Continue conversation
14. [ ] Tap "End Conversation"
15. [ ] Report card appears

### Touch Targets
Use Chrome DevTools to measure:
1. [ ] Right-click any button → Inspect
2. [ ] Check computed width/height in Styles panel
3. [ ] Verify minimum 44×44px on mobile
4. [ ] All buttons easy to tap with thumb

---

## Theme Testing

Test all 6 color themes in both light and dark mode:

### Light Mode Themes
- [ ] Indigo (default)
- [ ] Blue
- [ ] Emerald
- [ ] Rose
- [ ] Amber
- [ ] Violet

### Dark Mode Themes
- [ ] Indigo Dark
- [ ] Blue Dark
- [ ] Emerald Dark
- [ ] Rose Dark
- [ ] Amber Dark
- [ ] Violet Dark

### For Each Theme:
1. [ ] Open Settings (gear icon)
2. [ ] Toggle dark mode
3. [ ] Select color theme
4. [ ] Verify:
   - Header gradient matches theme
   - Active buttons use theme color
   - User message bubbles use theme gradient
   - Mobile nav active indicator uses theme
   - Focus rings use theme color
   - All text remains readable (contrast)

---

## iOS-Specific Testing

### iOS Safari Simulator (Xcode Required)
1. Open Xcode
2. Open Simulator (Xcode → Open Developer Tool → Simulator)
3. Choose iPhone model
4. Open Safari
5. Navigate to http://localhost:5173

### Test:
- [ ] Input doesn't zoom when focused (16px font)
- [ ] Keyboard pushes content up (not covering input)
- [ ] Safe area insets work on notched phones
- [ ] Smooth momentum scrolling in chat
- [ ] Pull-to-refresh disabled
- [ ] Overscroll bounce disabled
- [ ] Drawer swipe smooth

### iOS Keyboard Behavior
1. [ ] Tap chat input
2. [ ] Keyboard appears
3. [ ] Input stays visible above keyboard
4. [ ] Can type and see text
5. [ ] Tap send
6. [ ] Keyboard dismisses
7. [ ] Message appears correctly

---

## Android Testing

### Chrome Remote Debugging
1. Connect Android phone via USB
2. Enable USB Debugging in Developer Options
3. Open Chrome → chrome://inspect
4. Click "Inspect" on your device
5. Navigate to http://YOUR_LOCAL_IP:5173

### Test:
- [ ] Bottom nav respects navigation bar
- [ ] Keyboard behavior correct
- [ ] Back button closes drawer (if open)
- [ ] Touch feedback visible
- [ ] Scrolling smooth
- [ ] Landscape mode works

---

## Accessibility Testing

### Screen Reader (VoiceOver on iOS)
1. Settings → Accessibility → VoiceOver → On
2. Navigate app with swipe gestures
3. Check:
   - [ ] All buttons announced with labels
   - [ ] Active view announced
   - [ ] Messages read in order
   - [ ] Drawer state announced
   - [ ] Form inputs labeled correctly

### Screen Reader (TalkBack on Android)
1. Settings → Accessibility → TalkBack → On
2. Test similar to VoiceOver

### Keyboard Navigation (Desktop)
1. Disconnect mouse
2. Use Tab to navigate
3. Check:
   - [ ] Can reach all interactive elements
   - [ ] Focus indicators visible (blue outline)
   - [ ] Tab order logical
   - [ ] Enter/Space activate buttons
   - [ ] Escape closes modals

### Color Contrast
1. Use WCAG Color Contrast Checker
2. Test text on backgrounds:
   - [ ] Header title on header bg
   - [ ] Button text on button bg
   - [ ] Message text in bubbles
   - [ ] Timestamps
   - [ ] All theme variants

---

## Performance Testing

### Mobile Performance
1. Open Chrome DevTools
2. Performance tab
3. Record page load
4. Check:
   - [ ] First Contentful Paint < 1.5s
   - [ ] Time to Interactive < 3s
   - [ ] No layout shifts
   - [ ] Smooth 60fps animations

### Network Throttling
1. DevTools → Network tab
2. Select "Slow 3G"
3. Reload page
4. Check:
   - [ ] App loads without errors
   - [ ] Critical content visible quickly
   - [ ] Loading states show appropriately

---

## Bug Reporting Template

If you find issues, report them with:

```markdown
**Device/Browser:** iPhone 14, iOS 17, Safari
**Viewport:** 390×844
**Theme:** Dark mode, Indigo
**Issue:** Send button partially obscured by keyboard

**Steps to Reproduce:**
1. Start conversation
2. Tap input field
3. Keyboard appears
4. Send button not fully visible

**Expected:** Send button should remain visible above keyboard
**Actual:** Bottom 10px of button hidden

**Screenshot:** [attach]
```

---

## Quick Visual Checklist

### Mobile (< 768px)
✅ Sidebar = drawer from right
✅ Mobile nav = fixed bottom
✅ Header = compact (no subtitle)
✅ Touch targets = 44×44px min
✅ Chat messages = 90% max width
✅ Timestamps = always visible
✅ Input font = 16px (no zoom)

### Tablet (768px - 1279px)
✅ Sidebar = inline left
✅ Mobile nav = hidden
✅ Header = full (with subtitle + tabs)
✅ Touch targets = 40×40px
✅ Chat messages = 75% max width

### Desktop (1280px+)
✅ Sidebar = 360px wide
✅ Chat messages = 65% max width
✅ Larger typography
✅ Hover effects active

---

## Sign-Off Checklist

Before marking Phase 1 complete:

- [ ] All viewport sizes tested
- [ ] All themes tested (12 variants)
- [ ] iOS testing complete
- [ ] Android testing complete
- [ ] Accessibility verified
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Functionality intact
- [ ] User feedback positive

---

## Common Issues & Fixes

### Issue: Input zooms on iOS
**Fix:** Font size must be 16px minimum
**Status:** ✅ Fixed in mobile-first-enhancements.css

### Issue: Sidebar doesn't slide smoothly
**Fix:** Use transform instead of width transition
**Status:** ✅ Fixed with transform: translateX()

### Issue: Mobile nav obscures content
**Fix:** Add padding-bottom to app-body
**Status:** ✅ Fixed with calc(56px + safe-area)

### Issue: Touch targets too small
**Fix:** Increase to 44×44px minimum
**Status:** ✅ Fixed for all buttons

### Issue: Timestamps require hover
**Fix:** Make always visible
**Status:** ✅ Fixed in ChatMessage component

---

## Resources

- **Chrome DevTools Guide:** https://developer.chrome.com/docs/devtools/
- **iOS Simulator:** Xcode → Open Developer Tool → Simulator
- **Android Emulator:** Android Studio → AVD Manager
- **WCAG Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Responsive Viewer Extension:** Chrome Web Store

---

## Testing Schedule

**Day 1:**
- Visual testing (all viewports)
- Theme testing (all 12 variants)

**Day 2:**
- iOS device testing
- Android device testing

**Day 3:**
- Accessibility testing
- Performance testing

**Day 4:**
- Bug fixes
- Re-testing

**Day 5:**
- Final sign-off
- User acceptance testing

---

## Success Criteria

Phase 1 is successful when:

1. ✅ App works on all target devices
2. ✅ No critical bugs found
3. ✅ Touch targets meet standards
4. ✅ Accessibility requirements met
5. ✅ Performance acceptable
6. ✅ User feedback positive
7. ✅ All existing features work
8. ✅ Mobile experience feels native

---

**Happy Testing! 📱✨**

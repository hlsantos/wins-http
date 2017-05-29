@//@-------------------------------------------------------------------
@//@ 453.3 Check for Remaining Time
@//@ note: PageHeader.CheckTimeLeft is set in GlobalOpts.inc
@//@ This include file is currently added by PageHeader.inc
@//@-------------------------------------------------------------------

@IF PageHeader.CheckTimeLeft && !ACCESS.OID.OBJECTID_IGNORE_TIME_ONLINE && TIMELEFT <= 0@
  @UPDATEUSER@
  @MODULE UTL REDIRECT /logout?outoftime=1@
  @EXIT@
@ENDIF@
@//@-------------------------------------------------------------------

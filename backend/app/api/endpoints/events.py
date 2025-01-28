from typing import List
from fastapi import APIRouter

import schemas.events as events_schema

router = APIRouter()

#sampleデータの登録
@router.get('/events', response_model=List[events_schema.Events])
async def list_events():
    return [events_schema.Events(id=1, name="rock in japan", venue="ひたちなか", date="2024-09-23")]

@router.post('/events')
async def create_events():
    pass

@router.get('/events/{events_id}')
async def read_events():
    pass

@router.put('/events/{events_id}')
async def update_events():
    pass

@router.delete('/events/{events_id}')
async def delete_events():
    pass